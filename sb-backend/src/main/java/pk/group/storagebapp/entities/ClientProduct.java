package pk.group.storagebapp.entities;

import lombok.*;
import pk.group.storagebapp.keys.ClientProductKey;

import javax.persistence.*;

@Entity
@Table(name = "clientProduct")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(ClientProductKey.class)
public class ClientProduct {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Column(name = "ilosc")
    private Integer quantity;
}
