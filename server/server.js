const { ApolloServer } = require('apollo-server');
const dns = require('dns');
const service = require('./service');

const typeDefs = `
    type Item {
        id: Int
        type: String
        description: String
    }

    type Domain {
        name: String
        extension: String
        checkout: String
        available: Boolean
    }

    type Query {
        items(type: String): [Item]
    }

    input ItemIput {
        type: String
        description: String
    }

    type Mutation {
        saveItem(item: ItemIput): Item
        deleteItem(id: Int): Boolean
        generateDomains: [Domain]
        generateDomain(name: String): [Domain]
    }

`;

const items = [];

const isDomainAvailable = function(url) {
    return new Promise((resolve, reject) => {
        dns.resolve(url, function(error) {
            if(error) {
                resolve(true);
            }else {
                resolve(false);
            }
        })
    })
}

const resolvers = {
    Query: {
        async items(_, args) {
            const items = await service.getItemsByType(args.type);
            return items;
        }
    },
    Mutation: {
        async generateDomains() {
            const domains = [];
            const items = await service.getItems();
            for(const prefixe of items.filter(item => item.type === "prefixe")) {
                for(const sufixe of items.filter(item => item.type === "sufixe")) {
                    const name = prefixe.description + sufixe.description;
                    const url = name.toLowerCase();
                    const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
                    const available = await isDomainAvailable(`${url}.com.br`);
                    domains.push({
                        name,
                        checkout,
                        available
                    })
                }      
            }
            return domains;
        },
        async saveItem(_, args) {
            const newItem = await service.saveItem(args.item);
            return newItem[0];
        },
        deleteItem(_, args) {
            const id = args.id;
            service.removeItem(id);
            return true;
        },
        async generateDomain(_, args) {
            const name = args.name;
            const extensions = ['.com.br', '.com', '.net', '.org'];
            const domains = [];

            for(const extension of extensions) {
                const url = name.toLowerCase();
                const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
                const available = await isDomainAvailable(`${url}${extension}`);
                domains.push({
                    name,
                    extension,
                    checkout,
                    available
                })
            }      
            return domains;
        }
    }
    
}

const serve = new ApolloServer({ typeDefs, resolvers});
serve.listen();