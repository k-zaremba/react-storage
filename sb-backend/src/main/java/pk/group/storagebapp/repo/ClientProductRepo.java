package pk.group.storagebapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.group.storagebapp.entities.ClientProduct;
import pk.group.storagebapp.keys.ClientProductKey;

import java.util.List;

@Repository
public interface ClientProductRepo extends JpaRepository<ClientProduct, ClientProductKey> {

    List<ClientProduct> findAllByClientId(Long clientId);
}
