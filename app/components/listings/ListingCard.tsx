"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservations?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservations,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservations) {
      return reservations.totalPrice;
    }

    return data.price;
  }, [reservations, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservations) {
      return null;
    }

    const start = new Date(reservations.startDate);
    const end = new Date(reservations.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservations]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                aspect-square
                w-full
                relative
                overflow-hidden
                rounded-xl
                ">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
                object-cover
                h-full
                w-full
                group-hover:scale-110
                transition
                "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-md">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservations && <div className="font-light">/ night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
