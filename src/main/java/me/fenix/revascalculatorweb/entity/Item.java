package me.fenix.revascalculatorweb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public final class Item {
    @Id
    private int id;
    private String travel;
    @Column(name = "item_name")
    private String itemName;
    private int quality;
    private int price;

}
