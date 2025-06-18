"use client";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/app/Utils/Actions.ts/plaid";
import { useEffect, useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import NeutralButton from "../Buttons/NeutralButton";

interface PlaidLinkProps {
  userId: string;
}

const PlaidLink = ({ userId }: PlaidLinkProps) => {
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const getPublicLink = async () => {
      const result = await createLinkToken(userId);
      if (result.link_token) {
        setLinkToken(result.link_token);
      }
    };
    getPublicLink();
  }, [userId]);

  const onSuccess = useCallback(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token });
    },
    [userId]
  );

  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <NeutralButton
      onClick={() => open()}
      disabled={!ready}
      className="text-primaryBlue "
    >
      Link Bank Account
    </NeutralButton>
  );
};

export default PlaidLink;
