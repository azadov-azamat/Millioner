package ai.ecma.demo.security;

import ai.ecma.demo.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${app.jwtSecret}")
    private String jwtsecret;

    @Value("${app.jwtExpirationInMs}")
    private Long tokenAmalQilishMuddati;

    public String generateToken(User user) {

        Date date = new Date(new Date().getTime() + tokenAmalQilishMuddati);

        return Jwts
                .builder()
                .setSubject(user.getId().toString())
                .claim("roles", user.getRoles())
                .setIssuedAt(new Date())
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtsecret)
                .compact();
    }
}
