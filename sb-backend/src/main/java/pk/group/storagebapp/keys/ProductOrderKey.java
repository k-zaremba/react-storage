package pk.group.storagebapp.keys;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductOrderKey implements Serializable {
    private Long product;
    private Long order;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductOrderKey that = (ProductOrderKey) o;
        return product.equals(that.product) && order.equals(that.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(product, order);
    }
}
