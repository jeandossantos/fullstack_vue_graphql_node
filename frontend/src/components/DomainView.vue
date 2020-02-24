<template>
    <div class="container">
        <router-link to="/domains" >Voltar</router-link>
        <br>
        <br>
        <div class="text-left">
            <h2>{{ domain }}</h2>
            <div class="card">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item"  v-for="(domain, i) in domains" :key="i">
                  <div class="row">
                      <div class="col-md-6">
                        {{ domain.name }}{{domain.extension}}
                      </div>
                      <div class="col-md-3">
                        <span v-if="domain.available" class="badge badge-info">Disponível</span>
                        <span v-else class="badge badge-danger">Indisponível</span>
                      </div>
                        <div class="col-md-3 text-right">
                          <a :href="domain.checkout" target="_blank" class="btn btn-info">
                              <span class="fa fa-shopping-cart"></span>
                          </a>
                        </div>
                  </div>
                </li>
              </ul>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Domainview',
    props: ['domain'],
    data: function() {
        return {
            domains: []
        }
    },
    created() {
        axios({
            url: 'http://localhost:4000',
            method: 'post',
            data: {
                query: `
                    mutation ($name: String) {
                        domains: generateDomain(name: $name) {
                            name
                            extension
                            checkout
                            available
                        }
                    }               
                `,
                variables: {
                    name: this.domain
                }
            }
        }).then(response => {
            const query = response.data;
            this.domains = query.data.domains;
        })
    }
}

</script>

<style>

</style>