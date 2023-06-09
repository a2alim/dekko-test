package com.dekko.repository;

import com.dekko.entity.UserDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @Author Abdul Alim
 * @Since 6/7/2023
 */
@Repository
public interface UserRepository extends JpaRepository<UserDtl, Long> {

    Optional<UserDtl> findByEmail(String email);

}
