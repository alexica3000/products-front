import Http from '../http-common'

let routeLink  = '/products';

class ProductDataService {

    getAll(category_id = null) {
        return Http.get(`${routeLink}`, {params: {category_id: category_id}});
    }

    create(data) {
        return Http.post(`${routeLink}`, data);
    }

    delete(id) {
        return Http.delete(`${routeLink}/${id}`);
    }

    get(id) {
        return Http.get(`${routeLink}/${id}`);
    }

    update(id, data) {
        return Http.put(`${routeLink}/${id}`, data);
    }
}

export default new ProductDataService();
