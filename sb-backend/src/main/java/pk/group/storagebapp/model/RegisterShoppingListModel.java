package pk.group.storagebapp.model;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterShoppingListModel {
    private String nameList;
    private Long clientId;
    private Map<String, Integer> productModelList;
}
