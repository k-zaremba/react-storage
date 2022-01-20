package pk.group.storagebapp.model;

import lombok.*;
import pk.group.storagebapp.entities.Product;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticsModel {
    private List<Product> topProduct;
    private List<ProductModel> productModel;
    private Integer quantityOrder;
    private Integer quantityCancelledOrder;
}
