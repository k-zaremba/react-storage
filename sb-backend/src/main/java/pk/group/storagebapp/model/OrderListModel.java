package pk.group.storagebapp.model;

import lombok.*;
import pk.group.storagebapp.entities.Order;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderListModel {
    private Order order;
    private List<ProductModel> productList;
}
