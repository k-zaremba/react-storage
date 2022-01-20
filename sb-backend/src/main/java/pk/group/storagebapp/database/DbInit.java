package pk.group.storagebapp.database;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import pk.group.storagebapp.entities.User;
import pk.group.storagebapp.model.ClientProductModel;
import pk.group.storagebapp.model.RegisterModel;
import pk.group.storagebapp.model.RegisterShoppingListModel;
import pk.group.storagebapp.service.StorageService;

import java.util.HashMap;
import java.util.Map;

@Component
public class DbInit {

    private StorageService service;

    public DbInit(StorageService service) {
        this.service = service;
    }

    //@EventListener(ApplicationReadyEvent.class)
    public void startDBTest() {
        RegisterModel admin = RegisterModel.builder()
                .name("Admin")
                .lastname("Admin")
                .position("Administrator")
                .login("admin")
                .password("admin")
                .email("admin@shop.com")
                .permission(0)
                .build();
        RegisterModel kamil = RegisterModel.builder()
                .name("Kamil")
                .lastname("Zaremba")
                .login("kzaremba")
                .password("kzaremba")
                .email("kzaremba@shop.com")
                .permission(1)
                .build();
        RegisterModel piotr = RegisterModel.builder()
                .name("Piotr")
                .lastname("Migda")
                .login("pmigda")
                .password("pmigda")
                .email("pmigda@shop.com")
                .permission(2)
                .build();

        service.registerUser(admin);
        service.registerUser(kamil);
        service.registerUser(piotr);

        RegisterModel klient = RegisterModel.builder()
                .name("Jan")
                .lastname("Testowy")
                .login("jtest")
                .password("jtest")
                .email("jtest@gmail.com")
                .phoneNumber("985627485")
                .permission(3)
                .build();

        User client = service.registerUser(klient);

        Map<String, Integer> order1 = new HashMap<>();
        order1.put("10", 5);
        order1.put("5", 7);
        order1.put("14", 3);
        order1.put("36", 8);
        order1.put("41", 2);
        order1.put("22", 2);
        order1.put("35", 4);
        order1.put("16", 5);
        order1.put("42", 3);
        order1.put("28", 7);
        order1.put("37", 3);
        order1.put("49", 7);
        order1.put("11", 5);
        Map<String, Integer> order2 = new HashMap<>();
        order2.put("6", 5);
        order2.put("8", 7);
        order2.put("20", 3);
        order2.put("41", 2);
        order2.put("31", 8);
        order2.put("45", 3);
        order2.put("32", 7);
        order2.put("17", 5);

        service.registerOrder(order1, client.getClient().getId());
        service.registerOrder(order2, client.getClient().getId());
        service.editOrder(1L, "received", "paid");
        service.editOrder(2L, "completed", "paid");

        ClientProductModel model1 = ClientProductModel.builder()
                .clientId(1L)
                .productId(14L)
                .quantity(3)
                .build();
        ClientProductModel model2 = ClientProductModel.builder()
                .clientId(1L)
                .productId(37L)
                .quantity(4)
                .build();
        ClientProductModel model3 = ClientProductModel.builder()
                .clientId(1L)
                .productId(19L)
                .quantity(8)
                .build();
        service.addPantryItem(model1);
        service.addPantryItem(model2);
        service.addPantryItem(model3);

        RegisterShoppingListModel recipe1 = RegisterShoppingListModel.builder()
                .nameList("Naleśniki z kurczakiem i brokułami")
                .productModelList(new HashMap<String, Integer>() {{
                    put("51", 1);
                    put("52", 1);
                    put("53", 1);
                    put("30", 1);
                    put("23", 1);
                    put("34", 1);
                    put("2", 1);
                    put("12", 1);
                    put("44", 1);
                }})
                .build();
        RegisterShoppingListModel recipe2 = RegisterShoppingListModel.builder()
                .nameList("Rosół z kury")
                .productModelList(new HashMap<String, Integer>() {{
                    put("26", 1);
                    put("57", 1);
                    put("1", 2);
                    put("23", 1);
                    put("54", 1);
                    put("55", 1);
                    put("56", 1);
                }})
                .build();
        RegisterShoppingListModel recipe3 = RegisterShoppingListModel.builder()
                .nameList("Ziemniaczana zapiekanka z kurczakiem")
                .productModelList(new HashMap<String, Integer>() {{
                    put("51", 1);
                    put("10", 1);
                    put("30", 1);
                    put("8", 1);
                    put("44", 1);
                    put("23", 1);
                    put("54", 1);
                }})
                .build();
        RegisterShoppingListModel recipe4 = RegisterShoppingListModel.builder()
                .nameList("Bogracz tradycyjny")
                .productModelList(new HashMap<String, Integer>() {{
                    put("27", 1);
                    put("58", 3);
                    put("59", 1);
                    put("60", 1);
                    put("61", 4);
                    put("62", 3);
                }})
                .build();
        RegisterShoppingListModel recipe5 = RegisterShoppingListModel.builder()
                .nameList("Wegetariańskie tortille")
                .productModelList(new HashMap<String, Integer>() {{
                    put("63", 1);
                    put("59", 1);
                    put("60", 1);
                    put("58", 1);
                    put("61", 1);
                    put("65", 1);
                }})
                .build();

        service.registerShoppingListModel(recipe1);
        service.registerShoppingListModel(recipe2);
        service.registerShoppingListModel(recipe3);
        service.registerShoppingListModel(recipe4);
        service.registerShoppingListModel(recipe5);

        RegisterShoppingListModel slm1 = RegisterShoppingListModel.builder()
                .clientId(1L)
                .nameList("Przepyszna jajecznica")
                .productModelList(new HashMap<String, Integer>() {{
                    put("1", 1);
                    put("7", 2);
                    put("42", 3);
                    put("31", 2);
                    put("15", 9);
                    put("24", 4);
                }})
                .build();
        RegisterShoppingListModel slm2 = RegisterShoppingListModel.builder()
                .clientId(1L)
                .nameList("Na wieczorne serialowe chwile")
                .productModelList(new HashMap<String, Integer>() {{
                    put("1", 1);
                    put("7", 2);
                    put("42", 3);
                    put("31", 2);
                    put("15", 9);
                    put("24", 4);
                    put("2", 1);
                    put("8", 2);
                    put("41", 3);
                    put("33", 2);
                    put("11", 9);
                    put("26", 4);
                }})
                .build();
        RegisterShoppingListModel slm3 = RegisterShoppingListModel.builder()
                .clientId(1L)
                .nameList("Lista na brak pomysłów")
                .productModelList(new HashMap<String, Integer>() {{
                    put("1", 1);
                    put("7", 2);
                }})
                .build();
        RegisterShoppingListModel slm4 = RegisterShoppingListModel.builder()
                .clientId(1L)
                .nameList("Czwarta lista")
                .productModelList(new HashMap<String, Integer>() {{
                    put("1", 1);
                    put("7", 2);
                    put("42", 3);
                    put("15", 9);
                    put("24", 4);
                }})
                .build();
        RegisterShoppingListModel slm5 = RegisterShoppingListModel.builder()
                .clientId(1L)
                .nameList("Bez nazwy")
                .productModelList(new HashMap<String, Integer>() {{
                    put("1", 1);
                    put("31", 2);
                    put("15", 9);
                    put("24", 4);
                }})
                .build();

        service.registerShoppingListModel(slm1);
        service.registerShoppingListModel(slm2);
        service.registerShoppingListModel(slm3);
        service.registerShoppingListModel(slm4);
        service.registerShoppingListModel(slm5);

        service.shareList(8L);
        service.shareList(9L);

    }
}
