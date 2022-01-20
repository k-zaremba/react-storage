package pk.group.storagebapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.group.storagebapp.entities.Worker;

@Repository
public interface WorkerRepo extends JpaRepository<Worker, Long> {
}
