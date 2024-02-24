package me.fenix.revascalculatorweb.util;

public class MathUtil {

    public static boolean isNumber(String input) {
        try {
            Integer.parseInt(input);
            return true;
        } catch (NumberFormatException ignored) {
            return false;
        }
    }

    public static int doMath(String operation, int size) {
        String size1 = operation.replace("size", String.valueOf(size));

        if (operation.contains("/")) {
            String[] split = size1.split("/");
            return (int) Math.ceil(Double.parseDouble(split[0]) / Double.parseDouble(split[1]));
        } else if (operation.contains("x")) {
            String[] split = size1.split("x");
            return (int) Math.ceil(Double.parseDouble(split[0]) * Double.parseDouble(split[1]));
        } else {
            return size;
        }
    }

}
