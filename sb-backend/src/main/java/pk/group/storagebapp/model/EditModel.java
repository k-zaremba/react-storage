package pk.group.storagebapp.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EditModel {
    private String password;
    private String email;
    private Integer permission;
    private String phoneNumber;
    private Boolean isRegular;
}
