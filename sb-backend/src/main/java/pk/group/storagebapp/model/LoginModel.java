package pk.group.storagebapp.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginModel {
    private String login;
    private String password;
}
