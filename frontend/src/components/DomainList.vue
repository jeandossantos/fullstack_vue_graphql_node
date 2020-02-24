<template>
  <div> 
    <div id="main">
			<div class="container">
				<div class="row">
					<div class="col-md">
            <AppItemList title="Prefixes" type="prefixe" v-bind:items="item.prefixe" v-on:addItem="addItem" v-on:removeItem="removeItem"></AppItemList>
					</div>
					<div class="col-md">
            <AppItemList title="Sufixes" type="sufixe" v-bind:items="item.sufixe" v-on:addItem="addItem" v-on:removeItem="removeItem"></AppItemList>				
					</div>
				</div>
				<br/>	
        <h5>Domínios <span class="badge badge-info">{{  domains.length }}</span></h5>
        <div class="card">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item"  v-for="(domain, i) in domains" :key="i">
                  <div class="row">
                      <div class="col-md-6">
                        {{ domain.name }}
                      </div>
                      <div class="col-md-3">
                        <span v-if="domain.available" class="badge badge-info">Disponível</span>
                        <span v-else class="badge badge-danger">Indisponível</span>
                      </div>
                        <div class="col-md-3 text-right">
                          <a :href="domain.checkout" target="_blank" class="btn btn-info">
                              <span class="fa fa-shopping-cart"></span>
                          </a>
                          <button class="ml-1 btn btn-info" @click="openDomain(domain)">
                              <span class="fa fa-search"></span>
                          </button>
                        </div>
                  </div>
                </li>
              </ul>
          </div>
        </div>			 
			</div>
		</div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { mapState, mapActions } from 'vuex';
import AppItemList from './AppItemList';

export default {
  name: 'App',
  components: { AppItemList },
  data: function() {
    return {     
    }
  },
  methods: {
    ...mapActions(['addItem', 'removeItem', 'getItems', 'generateDomains']),
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`
      });
    }
  },
  computed: {
    ...mapState(['item', 'domains'])
  }
}
</script>

<style>

</style>
