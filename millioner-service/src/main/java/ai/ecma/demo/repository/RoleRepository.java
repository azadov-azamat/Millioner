package ai.ecma.demo.repository;

import ai.ecma.demo.entity.Role;
import ai.ecma.demo.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Set<Role> findAllByRoleName(RoleName roleName);

    Role findByRoleName(RoleName roleUser);
}
