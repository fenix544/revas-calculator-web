package me.fenix.revascalculatorweb.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TravelResponse {

    private String supplier;
    private String itemName;
    private int count;
    private int price;

}
