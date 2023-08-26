import axios from 'axios'

const EMPLOYEES_REST_API_URL='http://localhost:8088/fargoloans/api/item'

class ItemService {
  static getItems(){
    return axios.get(EMPLOYEES_REST_API_URL+"/all");
  }

  static createItem(item){
    return axios.post(EMPLOYEES_REST_API_URL+"/", item);
  }

  static getItemById(itemId){
    return axios.get(EMPLOYEES_REST_API_URL+'/'+itemId);
  }

  static updateItem(item,itemId){
    return axios.put(EMPLOYEES_REST_API_URL+'/'+itemId,item);
  }

static deleteItem(itemId){
    return axios.delete(EMPLOYEES_REST_API_URL+'/'+itemId);
}


}

export default ItemService;