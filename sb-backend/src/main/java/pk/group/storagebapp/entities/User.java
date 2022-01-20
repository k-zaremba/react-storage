package pk.group.storagebapp.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "hasło")
    private String password;

    @Column(name = "email")
    private String email;

    /*
    0 - admin
    1 - menedżer
    2 - pracownik
    3 - klient
     */
    @Column(name = "uprawnienia")
    private Integer permission;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id",referencedColumnName = "id", nullable = true)
    private Worker worker;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id",referencedColumnName = "id", nullable = true)
    private Client client;

}
