package me.fenix.revascalculatorweb.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import me.fenix.revascalculatorweb.entity.Item;
import me.fenix.revascalculatorweb.entity.Offer;
import me.fenix.revascalculatorweb.request.TravelRequest;
import me.fenix.revascalculatorweb.request.TravelResponse;
import me.fenix.revascalculatorweb.util.MathUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TravelService {

    @PersistenceContext
    private final EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public List<TravelResponse> findBestPriceItems(TravelRequest travelRequest) {
        List<TravelResponse> travelResponses = new ArrayList<>();

        List<Offer> resultList = (List<Offer>) this.entityManager.createNativeQuery("SELECT * from offer WHERE travel = ?1", Offer.class)
                .setParameter(1, travelRequest.travel())
                .getResultList();

        resultList.forEach(offer -> {
            List<Item> resultList1 = this.entityManager.createNativeQuery(
                            "SELECT * FROM item WHERE item_name = ?1 AND quality = ?2 ORDER BY price LIMIT 1",
                            Item.class)
                    .setParameter(1, offer.getOfferName())
                    .setParameter(2, travelRequest.quality())
                    .getResultList();

            Item lowestPriceItem = resultList1.isEmpty() ? null : resultList1.get(0);
            if (lowestPriceItem == null) {
                return;
            }

            int count = MathUtil.doMath(offer.getOperation(), travelRequest.clients());
            String travel = lowestPriceItem.getTravel().substring(9);
            travelResponses.add(new TravelResponse(travel, lowestPriceItem.getItemName(), count, lowestPriceItem.getPrice() * count));
        });

        return travelResponses;
    }

}
