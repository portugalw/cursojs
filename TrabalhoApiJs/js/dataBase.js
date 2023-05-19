export default {
    addItem : add,
    removeItemById : remove,
    getAll : getAll
}

const listItems = JSON.parse(localStorage.getItem('data')) || [];

function getAll(){
    return listItems;
}

function add(item){
    
    item.id = createId();
    listItems.push(item);
    localStorage.setItem('data', JSON.stringify(listItems));
    return item;
}

function remove(id){
    const index = listItems.findIndex(item => item.id == id);
    listItems.splice(index, 1);

    localStorage.setItem('data', JSON.stringify(listItems));
}

function createId(){
    return Date.now();
}
