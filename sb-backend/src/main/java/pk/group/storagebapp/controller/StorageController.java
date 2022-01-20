package pk.group.storagebapp.controller;

import org.springframework.web.bind.annotation.*;
import pk.group.storagebapp.entities.*;
import pk.group.storagebapp.model.*;
import pk.group.storagebapp.service.StorageService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class StorageController {

    private final StorageService service;

    public StorageController(StorageService service) {
        this.service = service;
    }

    @GetMapping("/clients")
    public List<Client> getClients() {
        return service.getClients();
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return service.getUsers();
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return service.getProducts();
    }

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable Long productId) {
        return service.getProduct(productId);
    }

    @GetMapping("/orders/history/{clientId}")
    public List<OrderListModel> getOrdersHistoryByClient(@PathVariable Long clientId) {
        return service.getOrderHistory(clientId);
    }

    @GetMapping("/order/list")
    public List<OrderListModel> getOrderList() {
        return service.getOrdersList();
    }

    @GetMapping("/statistics")
    public StatisticsModel getStatistics() {
        return service.getStatistics();
    }

    @GetMapping("/pantry/{clientId}")
    public List<ProductModel> getPantryByClient(@PathVariable Long clientId){
        return service.getPantryByClient(clientId);
    }

    @GetMapping("/shoppinglist/{clientId}")
    public List<ShoppingListModel> getShoppingListByClient(@PathVariable Long clientId){
        return service.getShopppingListByClient(clientId);
    }

    @GetMapping("/shoppinglist")
    public List<ShoppingListModel> getShopppingListPre(){
        return service.getShopppingListPre();
    }

    @GetMapping("/shoppinglist/public")
    public List<ShoppingListModel> getShoppingListPublic(){
        return service.getShoppingListPublic();
    }


    @PostMapping("/shoppinglist/edit")
    public ShoppingList editTitle(@RequestBody String nameList,
                                  @RequestParam Long shoppingListId){
        return service.editTitle(nameList,shoppingListId);
    }

    @PostMapping("/shoppinglist/share")
    public ShoppingList shareShoppingList(@RequestParam Long shoppingListId){
        return service.shareList(shoppingListId);
    }

    @PostMapping("/shoppinglist/unshare")
    public ShoppingList unshareShoppingList(@RequestParam Long shoppingListId){
        return service.unshareList(shoppingListId);
    }

    @PostMapping("/shoppinglist/add")
    public ShoppingListModel registerShoppingList(@RequestBody RegisterShoppingListModel model){
        return service.registerShoppingListModel(model);
    }

    @PostMapping("/pantry/add")
    public ClientProduct addPantryItem(@RequestBody ClientProductModel clientProductModel){
        return service.addPantryItem(clientProductModel);
    }

    @PostMapping("/user/edit/{userId}")
    public User editUser(@PathVariable Long userId,
                         @RequestBody EditModel editModel) {
        return service.editUser(userId, editModel);
    }

    @PostMapping("/product/add")
    public Product addProduct(@RequestBody ProductRegisterModel productRegisterModel) {
        return service.addProduct(productRegisterModel);
    }

    @PostMapping("/order/edit")
    public Order editOrder(@RequestParam Long orderId,
                           @RequestParam String statusOrder,
                           @RequestParam String statusPayment) {
        return service.editOrder(orderId, statusOrder, statusPayment);
    }

    @PostMapping("/order/register")
    public Order registerOrder(@RequestBody Map<String, Integer> map,
                               @RequestParam Long clientId) {
        return service.registerOrder(map, clientId);
    }

    @PostMapping("/user/register")
    public User registerUser(@RequestBody RegisterModel registerModel) {
        return service.registerUser(registerModel);
    }

    @PostMapping("/user/login")
    public User loginUser(@RequestBody LoginModel loginModel) {
        return service.loginUser(loginModel);
    }

    @PostMapping("/product/rate")
    public Product rateProduct(@RequestParam Long productId,
                               @RequestParam Double rate) {
        return service.rateProduct(productId, rate);
    }

    @PostMapping("/product/edit")
    public Product editProduct(@RequestBody ProductEditModel productEditModel,
                               @RequestParam Long productId) {
        return service.editProduct(productEditModel, productId);
    }

    @DeleteMapping("/user/delete")
    public void deleteUser(@RequestParam Long userId) {
        service.deleteUser(userId);
    }

    @DeleteMapping("/product/delete")
    public void deleteProduct(@RequestParam Long productId) {
        service.deleteProduct(productId);
    }

    @DeleteMapping("/pantry/delete")
    public void deletePantryItem(@RequestParam Long clientId,
                                 @RequestParam Long productId){
        service.deletePantryItem(clientId, productId);
    }

    @DeleteMapping("/shoppinglist/delete")
    public Long delete(@RequestParam Long shoppinglistId){
        return service.deleteShopppingList(shoppinglistId);
    }

}
