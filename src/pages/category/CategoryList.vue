<template>
    <div>
        <div class="card">

            <div class="card-header">
                <div class="row">
                    <div class="col">
                        <h2>Categories</h2>
                        <h5><span v-if="currentCategory.title">{{ currentCategory.title }}</span></h5>
                    </div>
                    <div class="col text-right">
                        <router-link class="btn btn-primary" :to="{name: 'ProductAdd'}" v-if="currentCategory.id">Add product</router-link>
                        <router-link class="btn btn-primary" :to="{name: 'CategoryAdd'}">New category</router-link>
                    </div>
                </div>
            </div>

            <div class="card-body">

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Category</th>
                            <th scope="col">Subcategories</th>
                            <th scope="col">Products</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            scope="row"
                            v-for="(category) in categories"
                            :key="category.id"
                        >
                            <th>{{ category.id }}</th>
                            <td>{{ category.title }}</td>
                            <td>
                                <div v-if="category.count_subcategories">
                                    <router-link
                                        :to="{name: 'CategoryList', params: {category_id: category.id}}"
                                    >{{ category.count_subcategories }}</router-link>
                                </div>
                            </td>
                            <td>
                                <div v-if="category.count_products">
                                    <router-link
                                        :to="{name: 'ProductList', params: {category_id: 33333}}"
                                    >{{ category.count_products }}</router-link>
                                </div>
                            </td>
                            <td>
                                <router-link :to="{name: 'CategoryEdit', params: {id: category.id}}">
                                    <button
                                        type="button"
                                        class="btn btn-warning btn-sm"
                                    >Edit</button>
                                </router-link>
                                <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="deleteCategory($event, category.id)"
                                >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
    import CategoryDataService from "../../routes/services/CategoryDataService";

    export default {
        data() {
            return {
                loadingComponent: false,
                category_id: null,
                categories: [],
                currentCategory: {
                    title: '',
                    id: ''
                }
            }
        },
        methods: {
            async retrieveCategories() {
                await CategoryDataService.getAll(this.$route.params.category_id)
                    .then(r => {
                        this.categories = r.data.data;
                    }).catch(e => {
                        console.log(e.response.data);
                    }).finally(() => {
                        this.loadingComponent = false;
                    });
            },
            async deleteCategory(e, id) {
                await CategoryDataService.delete(id)
                    .then(r => {
                        const index = this.categories.findIndex(v => v.id === r.data.id);
                        if (index > -1) this.categories.splice(index, 1);
                    }).catch(e => {
                      console.log(e.response.data);
                    });
            },
            async getCurrentCategory() {
                this.currentCategory.title = '';
                this.currentCategory.id = '';
                if(!this.$route.params.category_id) return;

                await CategoryDataService.get(this.$route.params.category_id)
                    .then(r => {
                        this.currentCategory = r.data.data;
                    }).catch(e => {
                        console.log(e.response.data);
                    });
            }
        },
        mounted(){
            this.retrieveCategories();
            this.getCurrentCategory();
        },
        watch: {
            "$route"() {
                this.retrieveCategories();
                this.getCurrentCategory();
            }
        }
    }
</script>

<style scoped>

</style>
