package pk.group.storagebapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nazwa")
    private String name;

    @Column(name = "cena")
    private BigDecimal value;

    @Column(name = "imgUrl")
    private String imgUrl;

    @Column(name = "ocena")
    private Double score;

    @Column(name = "ilosc_ocen")
    private Integer scoreNumber;

    @Column(name = "ilosc")
    private Integer quantity;
}
