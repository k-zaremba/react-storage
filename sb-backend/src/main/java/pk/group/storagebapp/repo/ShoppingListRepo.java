package pk.group.storagebapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.group.storagebapp.entities.Client;
import pk.group.storagebapp.entities.ShoppingList;

import java.util.List;

@Repository
public interface ShoppingListRepo extends JpaRepository<ShoppingList,Long> {

    List<ShoppingList> findAllByClientId(Long clientId);

    List<ShoppingList> findAllByClient(Client client);
}
