package pk.group.storagebapp.entities;

import lombok.*;
import pk.group.storagebapp.keys.ProductShoppingListKey;

import javax.persistence.*;

@Entity
@Table(name = "productShoppingList")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(ProductShoppingListKey.class)
public class ProductShoppingList {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shoppingList_id", referencedColumnName = "id")
    private ShoppingList shoppingList;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Column(name = "ilosc")
    private Integer quantity;

}
