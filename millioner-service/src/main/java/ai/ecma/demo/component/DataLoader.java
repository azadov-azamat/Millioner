package ai.ecma.demo.component;

import ai.ecma.demo.entity.User;
import ai.ecma.demo.entity.enums.RoleName;
import ai.ecma.demo.repository.RoleRepository;
import ai.ecma.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

@Component
public class DataLoader implements CommandLineRunner {

    final
    UserRepository userRepository;

    final
    RoleRepository roleRepository;
    final
    PasswordEncoder passwordEncoder;

    @Value("${spring.datasource.initialization-mode}")
    private String initMode;

    public DataLoader(UserRepository userRepository, RoleRepository roleRepository,
                      @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
        if (initMode.equals("always")) {
            userRepository.save(
                    new User(
                            "Super_admin",
                            "Adminov",
                            "+998977117711",
                            passwordEncoder.encode("root123"),
                            Collections.singleton(roleRepository.findByRoleName(RoleName.ROLE_SUPER_ADMIN)),
                            true
                    )
            );
            userRepository.save(
                    new User(
                            "Client",
                            "Clientov",
                            "+998992344565",
                            passwordEncoder.encode("root123"),
                            Collections.singleton(roleRepository.findByRoleName(RoleName.ROLE_CLIENT)),
                            true
                    )
            );
        }
    }
}
