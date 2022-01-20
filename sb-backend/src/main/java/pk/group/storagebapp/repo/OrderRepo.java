package pk.group.storagebapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.group.storagebapp.entities.Client;
import pk.group.storagebapp.entities.Order;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {

    List<Order> findAllByClient(Client client);
}
