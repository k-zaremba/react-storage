package pk.group.storagebapp.model;

import lombok.*;
import pk.group.storagebapp.entities.ShoppingList;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShoppingListModel {
    private ShoppingList shoppingList;
    private List<ProductModel> productModelList;
}
