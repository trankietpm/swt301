package net.javaguides.springboot;

import net.javaguides.springboot.model.TextItem;
import net.javaguides.springboot.repository.TextItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }

    @Autowired
    private TextItemRepository textItemRepository;

    @Override
    public void run(String... args) throws Exception {
        // Optionally, add some default data to the database
    }
}
