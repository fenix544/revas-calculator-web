package me.fenix.revascalculatorweb.controller;

import lombok.RequiredArgsConstructor;
import me.fenix.revascalculatorweb.request.TravelRequest;
import me.fenix.revascalculatorweb.request.TravelResponse;
import me.fenix.revascalculatorweb.service.TravelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class TravelController {

    private final TravelService travelService;

    @RequestMapping(
            path = "/api/v1/item",
            method = RequestMethod.POST
    )
    public ResponseEntity<List<TravelResponse>> findBestPriceItemsForTravel(@RequestBody TravelRequest travelRequest) {
        List<TravelResponse> bestPriceItems = this.travelService.findBestPriceItems(travelRequest);

        return ResponseEntity.status(bestPriceItems.isEmpty() ? HttpStatus.NOT_IMPLEMENTED : HttpStatus.OK)
                .body(bestPriceItems);
    }
}
