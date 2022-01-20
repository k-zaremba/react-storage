package pk.group.storagebapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.group.storagebapp.entities.Client;

@Repository
public interface ClientRepo extends JpaRepository<Client, Long> {
}
