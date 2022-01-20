package pk.group.storagebapp.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductEditModel {
    private BigDecimal value;
    private Integer quantity;
}
