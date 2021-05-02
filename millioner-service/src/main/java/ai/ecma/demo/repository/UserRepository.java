package ai.ecma.demo.repository;

import ai.ecma.demo.entity.Role;
import ai.ecma.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {

    User findByPhoneNumber(String phoneNumber);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByPhoneNumberAndRolesIn(String phoneNumber, Set<Role> roles);

//    boolean existsByEnabled(String enabled);

    void smsCode(Object smsCode);

    @Query(nativeQuery = true,
            value = "select * from users where enabled=true")
    List<User> getUserListWithPageable(String role_name, int currentSize, int currentPage);

}
