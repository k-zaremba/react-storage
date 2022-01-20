package pk.group.storagebapp.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterModel {
    private String login;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private Integer permission;
    private String phoneNumber;
    private String position;
}
