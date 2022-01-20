package pk.group.storagebapp.keys;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientProductKey implements Serializable {
    private Long client;
    private Long product;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientProductKey that = (ClientProductKey) o;
        return client.equals(that.client) && product.equals(that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(client, product);
    }
}
