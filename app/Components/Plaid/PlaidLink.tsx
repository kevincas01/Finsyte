"use client";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/app/Utils/Actions.ts/plaid";
import { useEffect, useState, useCallback, ReactNode } from "react";
import { usePlaidLink } from "react-plaid-link";
import NeutralButton from "../Buttons/NeutralButton";

interface PlaidLinkProps {
  userId: string;
  children: ReactNode;
}

const PlaidLink = ({
  userId,
  children,
}: PlaidLinkProps) => {
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
      await exchangePublicToken({ publicToken: public_token, userId: userId });
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
      {children}
    </NeutralButton>
  );
};

export default PlaidLink;
