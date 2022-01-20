package pk.group.storagebapp.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRegisterModel {
    private String name;
    private BigDecimal value;
    private String imgUrl;
}
