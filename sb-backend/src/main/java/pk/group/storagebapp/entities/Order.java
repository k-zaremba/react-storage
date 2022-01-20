package pk.group.storagebapp.entities;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "zamowienie")
    private String statusOrder;

    @Column(name = "data_zamowienia", columnDefinition = "TIMESTAMP")
    private LocalDateTime ordertime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @Column(name = "kwota")
    private BigDecimal value;

    @Column(name = "płatność")
    private String statusPayment;
}
