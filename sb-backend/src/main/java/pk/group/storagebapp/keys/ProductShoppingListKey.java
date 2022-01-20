package pk.group.storagebapp.keys;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductShoppingListKey implements Serializable {
    private Long product;
    private Long shoppingList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductShoppingListKey that = (ProductShoppingListKey) o;
        return product.equals(that.product) && shoppingList.equals(that.shoppingList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(product, shoppingList);
    }
}
