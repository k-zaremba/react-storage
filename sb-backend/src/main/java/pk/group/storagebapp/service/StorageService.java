package pk.group.storagebapp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pk.group.storagebapp.entities.*;
import pk.group.storagebapp.keys.ClientProductKey;
import pk.group.storagebapp.model.*;
import pk.group.storagebapp.repo.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StorageService {

    private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private final ClientRepo clientRepo;
    private final ProductRepo productRepo;
    private final UserRepo userRepo;
    private final OrderRepo orderRepo;
    private final ProductOrderRepo productOrderRepo;
    private final WorkerRepo workerRepo;
    private final ClientProductRepo clientProductRepo;
    private final ShoppingListRepo shoppingListRepo;
    private final ProductShoppingListRepo productShoppingListRepo;

    public StorageService(ClientRepo clientRepo, ProductRepo productRepo, UserRepo userRepo, OrderRepo orderRepo, ProductOrderRepo productOrderRepo, WorkerRepo workerRepo, ClientProductRepo clientProductRepo, ShoppingListRepo shoppingListRepo, ProductShoppingListRepo productShoppingListRepo) {
        this.clientRepo = clientRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.orderRepo = orderRepo;
        this.productOrderRepo = productOrderRepo;
        this.workerRepo = workerRepo;
        this.clientProductRepo = clientProductRepo;
        this.shoppingListRepo = shoppingListRepo;
        this.productShoppingListRepo = productShoppingListRepo;
    }

    public List<OrderListModel> getOrderHistory(long clientId) {
        Client client = clientRepo.getById(clientId);

        return orderRepo.findAllByClient(client).stream()
                .map(order -> getOrderList(order.getId()))
                .collect(Collectors.toList());
    }

    public List<OrderListModel> getOrdersList() {
        return orderRepo.findAll().stream()
                .map(order -> getOrderList(order.getId()))
                .collect(Collectors.toList());
    }

    public OrderListModel getOrderList(Long orderId) {
        Order order = orderRepo.findById(orderId).get();
        List<ProductOrder> productOrders = productOrderRepo.findAllByOrder(order);

        return OrderListModel.builder()
                .order(order)
                .productList(productOrders.stream().map(productOrder -> ProductModel.builder()
                                .product(productOrder.getProduct())
                                .quantity(productOrder.getQuantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    public List<Client> getClients() {
        return clientRepo.findAll();
    }

    public Product getProduct(Long productId) {
        return productRepo.getById(productId);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public StatisticsModel getStatistics() {
        List<OrderListModel> ordersList = getOrdersList().stream()
                .filter(order -> !order.getOrder().getStatusOrder().equals("cancelled"))
                .collect(Collectors.toList());

        List<ProductModel> productModel = new ArrayList<>();

        ordersList.forEach(order -> {
            order.getProductList().forEach(o -> {

                ProductModel model = ProductModel.builder()
                        .product(o.getProduct())
                        .quantity(o.getQuantity())
                        .build();

                if (productModel.contains(model)) {
                    ProductModel model1 = productModel.get(productModel.indexOf(model));
                    model1.setQuantity(model.getQuantity() + model1.getQuantity());
                    productModel.set(productModel.indexOf(model), model1);
                } else {
                    productModel.add(model);
                }
            });
        });

        Integer top = productModel.stream().map(ProductModel::getQuantity).max(Integer::compareTo).get();

        List<Product> productList = productModel.stream()
                .filter(productModel1 -> productModel1.getQuantity() == top)
                .map(ProductModel::getProduct)
                .collect(Collectors.toList());

        long cancelled = ordersList.stream().filter(order -> "cancelled".equals(order.getOrder().getStatusOrder())).count();

        return StatisticsModel.builder()
                .topProduct(productList)
                .productModel(productModel)
                .quantityOrder(ordersList.size())
                .quantityCancelledOrder((int) cancelled)
                .build();

    }

    public List<ProductModel> getPantryByClient(Long clientId) {
        return clientProductRepo.findAllByClientId(clientId).stream()
                .map(clientProduct ->
                        ProductModel.builder()
                                .product(clientProduct.getProduct())
                                .quantity(clientProduct.getQuantity())
                                .build()
                ).collect(Collectors.toList());
    }

    public List<ShoppingListModel> getShopppingListByClient(Long clientId) {
        List<ShoppingList> all = shoppingListRepo.findAllByClientId(clientId);

        return all.stream()
                .map(shoppingList -> {
                    List<ProductShoppingList> list = productShoppingListRepo.findAllByShoppingList(shoppingList);
                    return ShoppingListModel.builder()
                            .shoppingList(shoppingList)
                            .productModelList(list.stream()
                                    .map(productShoppingList -> ProductModel.builder()
                                            .product(productShoppingList.getProduct())
                                            .quantity(productShoppingList.getQuantity())
                                            .build())
                                    .collect(Collectors.toList()))
                            .build();
                }).collect(Collectors.toList());
    }

    public List<ShoppingListModel> getShopppingListPre() {
        List<ShoppingList> all = shoppingListRepo.findAllByClient(null);

        return all.stream()
                .map(shoppingList -> {
                    List<ProductShoppingList> list = productShoppingListRepo.findAllByShoppingList(shoppingList);
                    return ShoppingListModel.builder()
                            .shoppingList(shoppingList)
                            .productModelList(list.stream()
                                    .map(productShoppingList -> ProductModel.builder()
                                            .product(productShoppingList.getProduct())
                                            .quantity(productShoppingList.getQuantity())
                                            .build())
                                    .collect(Collectors.toList()))
                            .build();
                }).collect(Collectors.toList());
    }

    public List<ShoppingListModel> getShoppingListPublic() {
        List<ShoppingList> all = shoppingListRepo.findAll()
                .stream()
                .filter(shoppingList -> shoppingList.getStatus().equals("public"))
                .collect(Collectors.toList());

        return all.stream()
                .map(shoppingList -> {
                    List<ProductShoppingList> list = productShoppingListRepo.findAllByShoppingList(shoppingList);
                    return ShoppingListModel.builder()
                            .shoppingList(shoppingList)
                            .productModelList(list.stream()
                                    .map(productShoppingList -> ProductModel.builder()
                                            .product(productShoppingList.getProduct())
                                            .quantity(productShoppingList.getQuantity())
                                            .build())
                                    .collect(Collectors.toList()))
                            .build();
                }).collect(Collectors.toList());
    }


    @Transactional
    public ShoppingList editTitle(String nameList, Long shoppingListId) {
        ShoppingList list = shoppingListRepo.findById(shoppingListId).get();
        list.setNameList(nameList);
        return shoppingListRepo.save(list);
    }

    @Transactional
    public ShoppingListModel registerShoppingListModel(RegisterShoppingListModel model) {
        ShoppingList shoppingList = ShoppingList.builder()
                .nameList(model.getNameList())
                .status("private")
                .client(model.getClientId() != null ? clientRepo.getById(model.getClientId()) : null)
                .build();
        shoppingListRepo.save(shoppingList);
        List<ProductShoppingList> list = new ArrayList<>();

        model.getProductModelList().keySet().forEach(s -> {
            list.add(ProductShoppingList.builder()
                    .shoppingList(shoppingList)
                    .product(productRepo.getById(Long.valueOf(s)))
                    .quantity(model.getProductModelList().get(s))
                    .build());
        });

        productShoppingListRepo.saveAll(list);

        return ShoppingListModel.builder()
                .shoppingList(shoppingList)
                .productModelList(list.stream().map(productShoppingList -> ProductModel.builder()
                        .product(productShoppingList.getProduct())
                        .quantity(productShoppingList.getQuantity())
                        .build()).collect(Collectors.toList()))
                .build();
    }

    @Transactional
    public ClientProduct addPantryItem(ClientProductModel clientProductModel) {

        Optional<ClientProduct> optional = clientProductRepo.findById(ClientProductKey.builder()
                .client(clientProductModel.getClientId())
                .product(clientProductModel.getProductId())
                .build());

        Integer add = 0;

        if (optional.isPresent()) {
            add = optional.get().getQuantity();
        }

        ClientProduct clientProduct = ClientProduct.builder()
                .client(clientRepo.getById(clientProductModel.getClientId()))
                .product(productRepo.getById(clientProductModel.getProductId()))
                .quantity(clientProductModel.getQuantity() + add)
                .build();

        return clientProductRepo.save(clientProduct);
    }

    @Transactional
    public Product addProduct(ProductRegisterModel productRegisterModel) {

        if (productRepo.findByName(productRegisterModel.getName()).isPresent()) {
            return Product.builder().build();
        }

        Product product = Product.builder()
                .name(productRegisterModel.getName())
                .imgUrl(productRegisterModel.getImgUrl())
                .value(productRegisterModel.getValue())
                .score(0.00)
                .scoreNumber(0)
                .quantity(10)
                .build();

        productRepo.save(product);

        return product;
    }

    @Transactional
    public Order editOrder(Long orderId, String statusOrder, String statusPayment) {
        Order order = orderRepo.findById(orderId).get();

        if (statusOrder.equals("cancelled")) {
            OrderListModel orderList = getOrderList(orderId);

            orderList.getProductList().forEach(productModel -> {
                Product product = productRepo.findById(productModel.getProduct().getId()).get();
                product.setQuantity(product.getQuantity() + productModel.getQuantity());
                productRepo.save(product);
            });
        }

        order.setStatusOrder(statusOrder);
        order.setStatusPayment(statusPayment);

        return orderRepo.save(order);
    }

    @Transactional
    public Order registerOrder(Map<String, Integer> orderMap, Long clientId) {

        Client client = clientRepo.getById(clientId);

        List<Product> productList = new ArrayList<>();

        orderMap.keySet().forEach(s -> {
            Product product = productRepo.findById(Long.valueOf(s)).get();
            product.setQuantity(product.getQuantity() - orderMap.get(s));
            productRepo.save(product);
            productList.add(product);
        });


        BigDecimal value = productList.stream()
                .map(product1 -> product1.getValue().multiply(BigDecimal.valueOf(orderMap.get(product1.getId().toString()))).setScale(2, RoundingMode.HALF_UP))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (client.getIsRegular()) {
            value = value.multiply(BigDecimal.valueOf(0.8)).setScale(2, RoundingMode.HALF_UP);
        }

        Order order = Order.builder()
                .statusOrder("placed")
                .ordertime(LocalDateTime.now())
                .client(client)
                .statusPayment("pending")
                .value(value)
                .build();

        orderRepo.save(order);

        productList.stream()
                .map(product -> ProductOrder.builder()
                        .order(order)
                        .product(product)
                        .quantity(orderMap.get(product.getId().toString()))
                        .build())
                .forEach(productOrderRepo::save);
        return order;
    }

    @Transactional
    public User registerUser(RegisterModel registerModel) {

        if (userRepo.getByLogin(registerModel.getLogin()).isPresent() || userRepo.getByEmail(registerModel.getEmail()).isPresent()) {
            return User.builder().build();
        }

        Client client = null;
        Worker worker = null;

        if (registerModel.getPermission() == 3) {
            client = Client.builder()
                    .firstname(registerModel.getName())
                    .lastname(registerModel.getLastname())
                    .isRegular(false)
                    .phoneNumber(registerModel.getPhoneNumber())
                    .build();
            clientRepo.save(client);
        } else if (registerModel.getPermission() == 2) {
            worker = Worker.builder()
                    .firstname(registerModel.getName())
                    .lastname(registerModel.getLastname())
                    .position("Pracownik")
                    .build();
            workerRepo.save(worker);
        } else if (registerModel.getPermission() == 1) {
            worker = Worker.builder()
                    .firstname(registerModel.getName())
                    .lastname(registerModel.getLastname())
                    .position("Menedżer")
                    .build();
            workerRepo.save(worker);
        } else {
            worker = Worker.builder()
                    .firstname(registerModel.getName())
                    .lastname(registerModel.getLastname())
                    .position(registerModel.getPosition())
                    .build();
            workerRepo.save(worker);
        }


        User user = User.builder()
                .login(registerModel.getLogin())
                .email(registerModel.getEmail())
                .password(PASSWORD_ENCODER.encode(registerModel.getPassword()))
                .permission(registerModel.getPermission())
                .client(client)
                .worker(worker)
                .build();

        userRepo.save(user);

        return user;
    }

    @Transactional
    public User loginUser(LoginModel loginModel) {
        User user = userRepo.findByLogin(loginModel.getLogin());
        if (user == null) {
            return User.builder()
                    .build();
        } else if (PASSWORD_ENCODER.matches(loginModel.getPassword(), user.getPassword())) {
            return user;
        } else {
            return User.builder()
                    .build();
        }
    }

    @Transactional
    public User editUser(Long userId, EditModel editModel) {
        User user = userRepo.findById(userId).get();

        if (editModel.getPassword() != null) {
            user.setPassword(PASSWORD_ENCODER.encode(editModel.getPassword()));
        }
        if (editModel.getEmail() != null) {
            user.setEmail(editModel.getEmail());
        }
        if (editModel.getPermission() != null) {
            user.setPermission(editModel.getPermission());
        }
        if (editModel.getPhoneNumber() != null) {
            user.getClient().setPhoneNumber(editModel.getPhoneNumber());
        }
        if (editModel.getIsRegular() != null) {
            user.getClient().setIsRegular(editModel.getIsRegular());
        }

        return userRepo.save(user);
    }

    @Transactional
    public Product rateProduct(Long productId, Double rate) {

        Product product = productRepo.findById(productId).get();
        Double newScore = (product.getScore() * product.getScoreNumber() + rate) / (product.getScoreNumber() + 1);

        product.setScore(newScore);
        product.setScoreNumber(product.getScoreNumber() + 1);

        return productRepo.save(product);
    }

    @Transactional
    public Product editProduct(ProductEditModel productEditModel, Long productId) {
        Product product = productRepo.findById(productId).get();

        if (productEditModel.getValue() != null) {
            product.setValue(productEditModel.getValue());
        }
        if (productEditModel.getQuantity() != null) {
            product.setQuantity(product.getQuantity() + productEditModel.getQuantity());
        }

        return productRepo.save(product);
    }

    @Transactional
    public ShoppingList shareList(Long shoppingListId) {
        ShoppingList list = shoppingListRepo.findById(shoppingListId).get();
        list.setStatus("public");

        return shoppingListRepo.save(list);
    }

    @Transactional
    public ShoppingList unshareList(Long shoppingListId) {
        ShoppingList list = shoppingListRepo.findById(shoppingListId).get();
        list.setStatus("private");

        return shoppingListRepo.save(list);
    }


    public Long deleteShopppingList(Long shoppingListId) {
        ShoppingList shoppingList = shoppingListRepo.findById(shoppingListId).get();

        List<ProductShoppingList> all = productShoppingListRepo.findAllByShoppingList(shoppingList);

        productShoppingListRepo.deleteAll(all);
        shoppingListRepo.delete(shoppingList);
        return shoppingListId;
    }

    public void deleteProduct(Long productId) {
        Product product = productRepo.getById(productId);
        productRepo.delete(product);
    }

    public void deleteUser(Long userId) {
        User user = userRepo.getById(userId);
        userRepo.delete(user);
    }

    public void deletePantryItem(Long clientId, Long productId) {
        clientProductRepo.delete(clientProductRepo.findById(ClientProductKey.builder()
                .client(clientId)
                .product(productId)
                .build()).get());
    }
}
