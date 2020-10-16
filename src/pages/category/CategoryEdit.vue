<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h3>Edit Category (id: {{ category.id }})</h3>

                <form>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            id="category"
                            name="category"
                            placeholder="Enter category"
                            v-model="category.title"
                        >
                        <small class="invalid-feedback d-block" >{{ titleErrMessage }}</small>
                        <small class="form-text text-muted">Short name of the category</small>
                    </div>

                    <select class="form-control" @change="selectCategory">
                      <option value="">Select parent category</option>
                      <option
                          v-for="cat in categories"
                          :key="cat.id"
                          :value="cat.id"
                      >{{ cat.title }} id: {{ cat.id }}</option>
                    </select>
                    <small class="form-text text-muted">Select parent category</small>

                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="updateCategory"
                        :disabled="!disabled"
                    >Update</button>

                    <button
                        type="button"
                        class="btn btn-dark"
                        @click="goToCategoriesPage"
                    >Cancel</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryDataService from "../../routes/services/CategoryDataService";

    export default {
        data() {
            return {
                category: {
                  id: '',
                  title: '',
                  p_id: ''
                },
                titleErrMessage: '',
                disabledButton: false,
                categories: []
            }
        },
        methods: {
            async loadCategoryInfo() {
                await CategoryDataService.get(this.$route.params.id)
                    .then(r => {
                        this.category = r.data.data;
                    }).catch(e => {
                        console.log(e.response.data);
                    });
            },
            async updateCategory() {
                await CategoryDataService.update(this.$route.params.id, this.category)
                    .then(r => {
                      if(r.data) {
                        this.goToCategoriesPage();
                      }
                    }).catch(e => {
                        if(e.response.data.message && e.response.data.errors) {
                            const keys = Object.keys(e.response.data.errors);
                            this.titleErrMessage = e.response.data.errors[keys[0]][0];
                        }
                    });
            },
            async loadCategories() {
              await CategoryDataService.getAll()
                  .then(r => {
                    this.categories = r.data.data;
                  }).catch(e => {
                    console.log(e.response.data);
                  })
            },
            goToCategoriesPage() {
              !this.fromRoute || !this.fromRoute.name || !this.fromRoute.params
                  ? this.$router.push({name: 'CategoryList'})
                  : this.$router.push({name: this.fromRoute.name, params: this.fromRoute.params});
            },
            selectCategory(e) {
              this.category.p_id = e.target.value;
            }
        },
        computed: {
            disabled() {
                return this.category.title.length > 2;
            }
        },
        mounted() {
            this.loadCategoryInfo();
            this.loadCategories();
        },
        beforeRouteEnter (to, from, next) {
          next(vm => {
            vm.fromRoute = from;
          })
        }
    }
</script>

<style scoped>

</style>
