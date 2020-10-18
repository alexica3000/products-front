<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h3>New Product</h3>

                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="product" name="product" placeholder="Enter product" v-model="product.title">
                        <small class="form-text text-muted">Short name of the product</small>

                        <textarea class="form-control" id="description" name="description" rows="3" placeholder="Enter description" v-model="product.description"></textarea>
                        <small class="form-text text-muted">Short description</small>

                        <input type="number" class="form-control" id="price" name="price" placeholder="Enter price" v-model="product.price">
                        <small class="form-text text-muted">Price of the product</small>
                    </div>

                    <div v-if="!loadedCategory">
                        <h4>Select categories:</h4>
                        <ul>
                            <li
                                v-for="category in categories"
                                :key="category.id"
                            >
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            :value="category.id"
                                            v-model="selectedCategoriesId"
                                        >
                                        {{ category.title }}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-if="loadedCategory">
                      <input
                          type="text"
                          class="form-control"
                          :value="category.title"
                          disabled
                      >
                      <small class="form-text text-muted mb-3">Category of the product</small>
                    </div>

                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="addProduct"
                        :disabled="!disabled"
                    >Add</button>
                    <button
                        type="button"
                        class="btn btn-dark"
                        @click="goToBackRoute"
                    >Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductDataService from "../../routes/services/ProductDataService";
    import CategoryDataService from "../../routes/services/CategoryDataService";

    export default {
        data() {
            return {
                product: {
                    title: '',
                    description: '',
                    price: '',
                    categories_id: []
                },
                categories: [],
                selectedCategoriesId: [],
                category: {
                    title: '',
                    id: ''
                },
                loadedCategory: false
            }
        },
        methods: {
            async addProduct() {
                this.product.categories_id = this.selectedCategoriesId;

                await ProductDataService.create(this.product)
                    .then(r => {
                      if(r.data) {
                        this.goToBackRoute();
                      }
                    }).catch(e => {
                        console.log(e.response.data);
                    });
            },
            async loadCategoriesInfo() {
                await CategoryDataService.getAll()
                    .then(r => {
                        this.categories = r.data.data;
                    }).catch(e => {
                        console.log(e.response.data);
                    });
            },
            async getCategory(id) {
              await CategoryDataService.get(id)
                  .then(r => {
                    if(r.data) {
                      this.category = r.data.data;
                      this.selectedCategoriesId = [this.category.id];
                      this.loadedCategory = true;
                    }
                  }).catch(e => {
                    console.log(e.response.data);
                  });
            },
            goToBackRoute() {
              !this.fromRoute || !this.fromRoute.name || !this.fromRoute.params
                  ? this.$router.push({name: 'ProductList'})
                  : this.$router.push({name: this.fromRoute.name, params: this.fromRoute.params});
            },
            getParentCategoryIfExist() {
              if(this.fromRoute.params.category_id) {
                this.getCategory(this.fromRoute.params.category_id);
              }

              if(this.from_category_id) {
                this.getCategory(this.from_category_id);
              }
            }
        },
        computed: {
            disabled: function() {
                return this.product.title.length > 3 &&
                    this.product.description.length > 3 &&
                    this.product.price > 0;
            }
        },
        mounted() {
            this.loadCategoriesInfo();
            this.getParentCategoryIfExist();
        },
        beforeRouteEnter (to, from, next) {
          next(vm => {
            vm.fromRoute = from;
          })
        },
        props: ['from_category_id']
    }
</script>

<style scoped>

</style>
