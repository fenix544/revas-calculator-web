package me.fenix.revascalculatorweb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public final class Offer {
    @Id
    private int id;
    private String travel;

    @Column(name = "offer_name")
    private String offerName;
    private String operation;


}
