package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.TextItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextItemRepository extends JpaRepository<TextItem, Long> {
    // all crud database methods for TextItem
}
