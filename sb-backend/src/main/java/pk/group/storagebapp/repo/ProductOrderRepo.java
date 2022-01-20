package pk.group.storagebapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.group.storagebapp.entities.Order;
import pk.group.storagebapp.entities.ProductOrder;
import pk.group.storagebapp.keys.ProductOrderKey;

import java.util.List;

@Repository
public interface ProductOrderRepo extends JpaRepository<ProductOrder, ProductOrderKey> {
    List<ProductOrder> findAllByOrder(Order order);
}
