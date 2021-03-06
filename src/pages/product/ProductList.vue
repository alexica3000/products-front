<template>
    <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col">
                        <h3>Products</h3>
                        <h5 v-if="category.title">Category: {{ category.title }}</h5>
                    </div>

                    <div class="col text-right">
                        <router-link class="btn btn-primary" :to="{name: 'ProductAdd', params: {from_category_id: from_category_id}}">New product</router-link>
                    </div>
                </div>
            </div>

            <div class="spinner-border" role="status" v-if="loadingComponent">
                <span class="sr-only">Loading...</span>
            </div>

            <div class="card-body" v-else>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Categories</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr
                            scope="row"
                            v-for="(product) in products"
                            :key="product.id"
                        >
                            <th>{{ product.id }}</th>
                            <td>{{ product.title }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                              <ul>
                                <li
                                    v-for="category in product.categories"
                                    :key="category.id"
                                >
                                  {{ category.title }} (id: {{ category.id }})
                                </li>
                              </ul>
                            </td>
                            <td>
                                <router-link :to="{name: 'ProductEdit', params: {id: product.id}}">
                                    <button
                                        type="button"
                                        class="btn btn-warning btn-sm"
                                    >Edit</button>
                                </router-link>

                                <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="deleteProduct($event, product.id)"
                                >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
    </div>
</template>

<script>
    import ProductDataService from "../../routes/services/ProductDataService";
    import CategoryDataService from "@/routes/services/CategoryDataService";

    export default {
        data() {
            return {
                loadingComponent: false,
                products: [],
                category: {
                  title: '',
                  id: null
                },
                fromRoute: null
            }
        },
        methods: {
            async retrieveProducts() {
                this.loadingComponent = true;

                await ProductDataService.getAll(this.from_category_id)
                    .then(r => {
                        this.products = r.data.data;
                    }).catch(e => {
                        console.log(e.response.data);
                    }).finally(() => {
                        this.loadingComponent = false;
                    });
            },
            async deleteProduct(e, id) {
                await ProductDataService.delete(id)
                    .then(r => {
                        const index = this.products.findIndex(v => v.id === r.data.id);
                      if (index > -1) this.products.splice(index, 1);
                    }).catch(e => {
                        console.log(e.response);
                    });
            },
            async getCategory() {
                if(!this.from_category_id) return;

                await CategoryDataService.get(this.from_category_id)
                    .then(r => {
                        if(r.data) {
                            this.category = r.data.data;
                        }
                    }).catch(e => {
                        console.log(e.response.data);
                    })
            }
        },
        mounted(){
            this.getCategory();
            this.retrieveProducts();
        },
        props: ['from_category_id'],
        beforeRouteEnter (to, from, next) {
          next(vm => {
            vm.fromRoute = from;
          })
        }
    }
</script>

<style scoped>
    .spinner-border {
        margin: 30px;
    }
</style>
