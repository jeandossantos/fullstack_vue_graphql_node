import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios'; 

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        item: {
            prefixe: [],
            sufixe: []
          },
          domains: []
    },
    mutations: {
        addItem(state, payload) {
            const { item, newItem } = payload;
            state.item[item.type].push(newItem);
        },
        removeItem(state, payload) {
            const item = payload;
            state.item[item.type].splice(state.item[item.type].indexOf(item), 1);
        },
        setItems(state, payload) {
            const { type, items } = payload;
            state.item[type] = items;
        },
        setDomains(state, payload) {
            state.domains = payload;
        }
    },
    actions: {
        async addItem(context, payload) {
            const item = payload;
            axios({
                url: 'http://localhost:4000',
                method: 'post',
                data: {
                  query: `
                      mutation ($item: ItemIput) {
                       newItem: saveItem(item: $item) {
                          id
                          type
                          description
                        }
                      }         
                  `,
                  variables: {
                    item
                  }
              }
              }).then(response => {
                const query = response.data;
                const newItem = query.data.newItem;
                context.commit('addItem', { item, newItem });
                context.dispatch("generateDomains");
              });
        },
        async removeItem(context, payload) {
            const item = payload;
            axios({
                url: 'http://localhost:4000',
                method: 'post',
                data: {
                  query: `
                    mutation ($id: Int) {
                      deleted: deleteItem(id: $id) 
                    }
                  `,
                  variables: {
                    id: item.id
                  }
                }
              }).then(() => {
                context.commit('removeItem', item);
                context.dispatch("generateDomains");
              });
        }, 
        async getItems(context, payload) {
            const type = payload;
            return axios({
                url: 'http://localhost:4000',
                method: 'post',
                data: {
                  query: `
                    query ($type: String) {
                      items: items (type: $type) {
                        id
                        type
                        description
                      }
                    }
                  `,
                  variables: {
                    type
                  }
                }
              }).then(response => {
                const query = response.data;
                context.commit('setItems', { type, items: query.data.items });
              });
        },
        async generateDomains(context) {
            axios({
                method: 'post',
                url: 'http://localhost:4000',
                data: {
                  query: `
                     mutation {
                       domains: generateDomains {
                          name
                          checkout
                          available
                       }
                     }         
                  `
                }
              }).then(response => {
                const query = response.data;
                const domains = query.data.domains;
                context.commit('setDomains', domains);
              });
        }
    }
})

Promise.all([
    store.dispatch("getItems",'prefixe'),
    store.dispatch("getItems", 'sufixe')
  ]).then(() => {
    store.dispatch("generateDomains");
  });


export default  store;