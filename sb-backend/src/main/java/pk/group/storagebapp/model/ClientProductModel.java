package pk.group.storagebapp.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientProductModel {
    private Long clientId;
    private Long productId;
    private Integer quantity;
}
